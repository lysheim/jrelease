const { parseGitconfig, getRepoDetails } = require('../../lib/tools/gitConfig')

const testConfigPath = `${process.cwd()}/test/tools/configs`

const validConfig = {
  path: `${testConfigPath}/configValid1`,
  expectedRes: {
    core: {
      repositoryformatversion: '0',
      filemode: 'false',
      bare: 'false',
      logallrefupdates: 'true',
      symlinks: 'false',
      ignorecase: 'true'
    },
    'remote "origin"': {
      url: 'https://github.com/jorgtho/tukkll.git',
      fetch: '+refs/heads/*:refs/remotes/origin/*'
    },
    'branch "main"': {
      remote: 'origin',
      merge: 'refs/heads/main'
    }
  }
}

const validConfigs = [
  {
    path: `${testConfigPath}/configValid2`,
    desc: 'When config has a some blank lines here and there'
  },
  {
    path: `${testConfigPath}/configValid3`,
    desc: 'When config has a duplicate property but with same values within a top level property'
  },
  {
    path: `${testConfigPath}/configValid4`,
    desc: 'When config has a origin set with ssh url'
  }
]

const invalidConfigs = [
  {
    path: `${testConfigPath}/configInvalid1`,
    desc: 'When config has a weird line'
  },
  {
    path: `${testConfigPath}/configInvalid2`,
    desc: 'When config has something before the first "main" property'
  },
  {
    path: `${testConfigPath}/configInvalid3`,
    desc: 'When config has a duplicate property on top level'
  },
  {
    path: `${testConfigPath}/configInvalid4`,
    desc: 'When config has a duplicate property with different values inside a top level property'
  },
  {
    path: `${testConfigPath}/configInvalid666`,
    desc: 'When config path does not exist'
  }
]

const invalidUrlConfigs = [
  {
    path: `${testConfigPath}/configInvalid5`,
    desc: 'When ssh url is set to gitlab'
  },
  {
    path: `${testConfigPath}/configInvalid6`,
    desc: 'When https url is set to gitlab'
  }
]

test('Valid config parses git config and returns result as an object with correct values', () => {
  const conf = parseGitconfig(validConfig.path)
  for (const key of Object.keys(validConfig.expectedRes)) {
    expect(key in conf).toBe(true)
    for (const [key2, val2] of Object.entries(validConfig.expectedRes[key])) {
      expect(key2 in conf[key]).toBe(true)
      expect(conf[key][key2]).toBe(val2)
    }
  }
})

describe('Valid configs return an object', () => {
  validConfigs.forEach(config => {
    test(config.desc, () => {
      const conf = parseGitconfig(config.path)
      expect(typeof conf).toBe('object')
    })
  })
})

describe('Invalid configs throw error', () => {
  invalidConfigs.forEach(config => {
    test(config.desc, () => {
      const fn = () => parseGitconfig(config.path)
      expect(fn).toThrow()
    })
  })
})

// Test getRepoDetails
describe('Valid configs return as expected when running getRepoDetails', () => {
  validConfigs.forEach(config => {
    test(config.desc, () => {
      const { repoName } = getRepoDetails(config.path, true)
      expect(typeof repoName).toBe('string')
      expect(repoName.length).toBeGreaterThan(0)
    })
  })
})

describe('InvalidUrlConfigs throw when running getRepoDetails', () => {
  invalidUrlConfigs.forEach(config => {
    test(config.desc, () => {
      const fn = () => getRepoDetails(config.path, true)
      expect(fn).toThrow()
    })
  })
})

const validDetailsConfig = {
  path: `${testConfigPath}/configDetailsValid1`,
  expectedRes: {
    repoName: 'tubularSoda',
    repoOwner: 'mrKrabs'
  }
}
const validDetailsConfig2 = {
  path: `${testConfigPath}/configDetailsValid2`,
  expectedRes: {
    repoName: 'tubularSoda',
    repoOwner: 'mrKrabs'
  }
}

const invalidDetailsConfigs = [
  {
    path: `${testConfigPath}/configDetailsInvalid1`,
    desc: 'When config has a broken url'
  },
  {
    path: `${testConfigPath}/configDetailsInvalid2`,
    desc: 'When remote is not hosted at github.com'
  }
]

test('GetRepoDetails gets correct values for owner and repo', () => {
  const details = getRepoDetails(validDetailsConfig.path, true)
  expect(details.repoName).toBe(validDetailsConfig.expectedRes.repoName)
  expect(details.repoOwner).toBe(validDetailsConfig.expectedRes.repoOwner)

  const details2 = getRepoDetails(validDetailsConfig2.path, true)
  expect(details2.repoName).toBe(validDetailsConfig2.expectedRes.repoName)
  expect(details2.repoOwner).toBe(validDetailsConfig2.expectedRes.repoOwner)
})

describe('Invalid urls throw error', () => {
  invalidDetailsConfigs.forEach(config => {
    test(config.desc, () => {
      const fn = () => getRepoDetails(config.path, true)
      expect(fn).toThrow()
    })
  })
})
