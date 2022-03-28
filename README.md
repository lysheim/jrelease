# jrelease
Rewrite of [Vercel's release](https://github.com/vercel/release) (Generate changelogs with a single command)

Creates a new Github-release with changelog based on commits since previous release. Useful for when you don't want to manually bump package.json, creating a Github-release in the browser and writing the changelog yourself.

Really useful for when you have Github-actions triggered by new Github-releases :rocket:

## Installation
```bash
npm i --g jrelease
```

## Changes from Vercel's "Release"
- Windows support! (the reason for this package - I have been waiting too long for Vercel to merge [a pull request](https://github.com/vercel/release/pull/157))
- **-l** and **--list** has arrived, simply lists all commits since latest stable release, does not change anything
- General flow of stuff is changed - jrelease won't add, commit, or push anything until the end of the jrelease-process.
- Github device flow authentication, instead of web flow
- Removed overwriting of tags
- Pre-releases are not defined as a flag anymore but as semver types (prepatch, preminor, premajor, or simply pre - to increase a pre-release version)
- Use of annotated tags and "push --follow-tags", instead of git push && git push --tags (doesn't push all your local tags to remote, only annotated - [read more about tags here](https://git-scm.com/docs/git-tag))

## Usage
```bash
jrelease <semver type>
```
Where [semver types](https://semver.org) are one of the following:

-   `major`: Incompatible API changes were introduced (breaking changes)
-   `minor`: Functionality was added in a backwards-compatible manner (new functionality, non breaking)
-   `patch`: Backwards-compatible bug fixes were applied (bug fixes, non breaking)
-   `premajor`: A [pre-release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) of a major release
-   `preminor`: A [pre-release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) of a minor release
-   `prepatch`: A [pre-release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) of a patch release
-   `pre`: Increase the previous pre-release (e.g 2.0.0-canary.1 -> 2.0.0-canary.2). If previuos release was not a pre-release, the *pre* command works as *prepatch*

### Options
```bash
jrelease help
```
- `-l`, `--list-commits`: Only lists commits since previous release (does not change anything)
- `-P`, `--publish`: Instead of creating and opening a draft, publish the release
- `-u`, `--show-url`: Show the release URL instead of opening it in the browser
- `-t`, `--previous-tag`: Manually specify previous release (changelog will start there)
- `-p`, `--pre-suffix`: Provide a suffix for a prerelease, "canary" is used as default
- `-s`, `--skip-questions`: Skip the questions and create a simple list without the semver-type headings
- `-c`, `--crlf`: do not temporarily set core.safecrlf to "false". (If you are not familliar with git config crlf settings, dont worry about this flag, it only supresses a usually useless warning)

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Uninstall the package if it's already installed: `npm uninstall -g jrelease`
3. Link the package to the global module directory: `npm link`
4. You can now use `jrelease` on the command line!
5. When you have done something cool or fixed something - [Create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

## Credits

Thanks a lot to [Vercel](https://vercel.com/about) and Leo Lamprecht ([@notquiteleo](https://twitter.com/notquiteleo)) who made the [original package](https://github.com/vercel/release) - I simply stole their code and made it work on Windows too, so that my colleague won't have to create releases for me anymore, because I didn't want to do it manually in the browser.