# Transitive Chart

RESAS API から取得した総人口データを県別に推移グラフとして可視化したアプリケーション

# 技術スタック

- React v18 + TanStack（Router, Query, Charts）+ Vite + TypeScritp
- Vercel Functions（RESAS APIにAPI_KEYを流出させない形でアクセスさせるため）

# 残タスク

- Vercelへのデプロイが未完了です
- Vercelがローカル環境で動かないためDockerの利用が不完全
- Docker側での静的サイトホスティング
- Reactのエラー `chunk-BQFTMEPT.js?v=1ee0d84a:519 Warning: Internal React error: Expected static flag was missing. Please notify the React team.` の解消

# 開発環境構築

このリポジトリは`pnpm`を利用しています。

1. `nvm`等をインストールし、Node20を利用する
2. `corepack enable pnpm` を実行しpnpmを有効化
3. `pnpm install` を実行
4. `npm install -g vercel` で vercel CLIをインストール
5. `vercel login`にてVercel環境にログイン
6. `src/`をプロジェクトルートにし、Functionsをデプロイ
7. `pnpm dev`で開発用サーバーを立ち上げ
