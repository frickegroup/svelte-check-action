# Svelte Check Action

Enhance your [svelte-check](http://npmjs.com/svelte-check) experience in GitHub actions by adding both comments and annotations to your PRs.

```yaml
name: Svelte Check

on:
    - pull_request

jobs:
    demo:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v4

            # You can replace these steps with your specific setup steps
            # This example assumes Node 22 and pnpm 10
            - name: Setup Node 22
              uses: actions/setup-node@v4
              with:
                  node-version: 22
                  registry-url: https://registry.npmjs.org/

            - name: Setup PNPM
              uses: pnpm/action-setup@v4.1.0
              with:
                  version: 10.11.1

            - name: Install
              run: pnpm install

            # Run the svelte check action
            - name: Svelte Check
              uses: ghostdevv/svelte-check-action@v1
```

This will add a comment to your PRs with any errors, for example:

![example comment](./.github/example-comment.png)

and annotations to your changed files tab:

![example annotation](./.github/example-annotation.png)

## Options

| Option          | Description                                                                                                                                                                      | Default               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `paths`         | The folder(s) to run svelte-check in, one per line. `svelte-kit sync` will be ran before diagnostics if SvelteKit is found at the folder package.json.                           | `.`                   |
| `filterChanges` | When true only the files that change (in the pull request) will be checked                                                                                                       | `true`                |
| `failOnError`   | Should we cause CI to fail if there is a Svelte Check error?                                                                                                                     | `false`               |
| `failOnWarning` | Should we cause CI to fail if there is a Svelte Check warning?                                                                                                                   | `false`               |
| `failFilter`    | When failFilter is set and either failOnError or failOnWarning is enabled, the action will only fail for issues that occur in paths matching these globs.                        | Disabled              |
| `token`         | The GitHub token used to authenticate with the GitHub API. By default, GitHub generates a token for the workflow run - which we use. You can provide your own token if you like. | `${{ github.token }}` |

You can configure the action by passing the options under the `with` key, for example:

```yaml
- name: Svelte Check
  uses: ghostdevv/svelte-check-action@v1
  with:
      paths: |
          ./packages/app
```

## Deprecated Options (will be removed in next major release)

- Setting `GITHUB_TOKEN` environment variable is deprecated, please remove it completely if you want to use the default token managed by GitHub - or set your own using the `token` option.
