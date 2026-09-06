# AGENTS.md

このファイルは、このリポジトリで作業するコーディングエージェント向けのルールを定義します。

## リポジトリ構成

- リポジトリのルートには、npmへ公開するReact Nativeライブラリがあります。
- `src/` にはTypeScriptの公開APIとテストがあります。
- `android/` にはSUNMIプリンターSDKをラップするKotlinブリッジがあります。
- `example/` は結合確認とAndroidビルド検証に使用するReact Nativeアプリです。
- `lib/` 配下の生成物やGradleのビルド生成物はコミットしません。
- このライブラリはiOSをサポートしていません。プロジェクトとして明示的に決定されない限り、iOS対応を追加したり、対応済みと記載したりしません。

## 開発環境

- `.node-version` に記載されたNode.jsを使用します。
- `.yarn/releases/` にコミットされたYarnを使用し、依存関係のインストールにnpmを使用しません。
- Node.js製の開発CLIはグローバルインストールせず、ルートの `devDependencies` に固定して `yarn <command>` で実行します。
- リポジトリのルートで `corepack enable`、続けて `yarn install --immutable` を実行して依存関係をインストールします。
- Android開発にはJDK 17と、`example/android/build.gradle` に定義されたバージョンのAndroid SDKが必要です。
- リポジトリに含まれるGradle Wrapperを使用し、グローバルにインストールされたGradleには依存しません。

## 必須の検証

検証はリポジトリのルートで実行します。変更内容に応じて必要な検証を選び、PRを作成する前に該当するコマンドをすべて実行します。

```sh
yarn typecheck
yarn lint
yarn test
yarn example build:android
```

Android exampleのビルドでは、`armeabi-v7a` と `arm64-v8a` 向けに `assembleDebug` を実行します。この検証で確認できるのはコンパイルとリンクまでです。プリンターの実動作は、対応するSUNMI端末で別途確認します。

## React Nativeの更新

- 更新対象のアプリは `example/` です。ルートのReact Native関連 `devDependencies` も、テストとビルドで同じ実体を使うためexampleと同じバージョンに揃えます。
- 更新前にCallstackの `upgrading-react-native` スキルが利用可能なら読み込み、Upgrade Helperおよび `react-native-community/rn-diff-purge` の正規テンプレート差分を基準にします。
- 現在値は `example/package.json` から取得し、更新先はnpmの `react-native` の `latest` とrn-diff-purgeの `RELEASES` の両方で存在を確認します。近いパッチバージョンを推測で代用しません。
- `react`、`react-test-renderer`、`@types/react`、React NativeのBabel・Metro・Jest・TypeScript設定、Community CLIは、対象React Nativeのテンプレートに記載された互換セットとして一括更新します。
- 依存関係の編集後はルートでYarnによるインストールを1回行い、`yarn.lock` を更新します。npmやパッケージ単位の追加インストールを繰り返しません。
- Androidテンプレート差分は、SDK、Kotlin、Gradle Wrapper、`MainApplication.kt`、Manifest、Gradle propertiesを確認します。Gradle WrapperのJARとスクリプトも対象バージョンのテンプレートに揃えます。
- example固有のアプリID、SUNMIサービスの `queries`、`armeabi-v7a` / `arm64-v8a`、ライブラリソースを参照するBabel・Metro設定は保持します。テンプレートのアプリ名やサンプル画面で上書きしません。
- このライブラリはAndroid専用のため、React NativeテンプレートのiOS差分は適用しません。
- New ArchitectureのCodegenでは、ライブラリ側の `android/build.gradle` にある `jsRootDir` を `src/` に限定します。リポジトリ全体を探索するとexampleの依存パッケージの生成コードがライブラリAARへ混入し、クラスが重複します。
- React Native更新後は必須検証をすべて実行し、接続中のSUNMI端末がある場合はプロジェクト内の `agent-device` を使ってAPKのインストールと起動を確認します。

```sh
yarn agent-device install com.sunmiprinterlibraryexample example/android/app/build/outputs/apk/debug/app-debug.apk --platform android
yarn agent-device open com.sunmiprinterlibraryexample --platform android --relaunch
yarn agent-device close
```

印刷、スキャンなどハードウェア依存機能は、アプリ起動だけで確認済みとせず、対応するSUNMI実機で操作結果を確認してPRへ記載します。

## 変更時のルール

- PRは1つの目的に絞り、無関係な整理や修正を含めません。
- 明示的に破壊的変更を求められていない限り、公開されているTypeScript APIの後方互換性を維持します。
- APIを変更するときは、TypeScript定義、Kotlinブリッジ、テスト、READMEの使用例、exampleアプリの内容を一致させます。
- JavaScriptまたはTypeScriptの振る舞いを変更するときは、可能な限りJestテストを追加または更新します。
- ネイティブ実装や印刷動作に影響するコードを変更するときはAndroid exampleをビルドし、接続可能な対応SUNMI端末で実機確認します。実施内容と結果、または実施できなかった確認事項をPRに記載します。
- タスクに必要でない限り、生成物、依存関係のロックファイル、リリース設定、ワークフローを変更しません。
- GitHub Actionsの依存先は完全なコミットSHAに固定し、SHAの横にバージョンコメントを残します。
- 認証情報、署名鍵、端末識別子、`local.properties` などのローカルAndroid設定はコミットしません。

## GitとPR

- 現在の統合ブランチおよびPRのデフォルトのベースは `develop` です。明示的な依頼がない限り、デフォルトブランチやリリースフローを変更しません。
- コミットメッセージには `feat:`、`fix:`、`test:`、`docs:`、`refactor:`、`chore:` などのConventional Commits形式を使用します。
- コミットは目的単位または機能単位に分け、1コミットが1つのまとまった変更になる、レビュー可能な適度な粒度にします。無関係な変更や複数の独立した目的を1コミットへ混在させません。
- PR本文には変更の概要、検証コマンドと結果、未実施の端末テストを記載します。
- 作業ツリーに既に存在する無関係な変更を、書き換えたり破棄したりコミットへ含めたりしません。

## リリース作業の範囲

パッケージ公開とバージョン管理はメンテナーが行います。リリース変更が明示的に依頼されていない限り、通常の開発作業でバージョン更新、タグ作成、パッケージ公開、`.github/workflows/publish.yml` の変更を行いません。
