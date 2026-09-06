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
- コミットは、1つのまとまった目的を持ちレビュー可能な大きさに分割します。
- PR本文には変更の概要、検証コマンドと結果、未実施の端末テストを記載します。
- 作業ツリーに既に存在する無関係な変更を、書き換えたり破棄したりコミットへ含めたりしません。

## リリース作業の範囲

パッケージ公開とバージョン管理はメンテナーが行います。リリース変更が明示的に依頼されていない限り、通常の開発作業でバージョン更新、タグ作成、パッケージ公開、`.github/workflows/publish.yml` の変更を行いません。
