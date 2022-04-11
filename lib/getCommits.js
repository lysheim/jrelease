const { runAndReturnGitCommand } = require('./tools/gitConfig')

const parseCommits = (rawCommits) => {
  const lines = rawCommits.split(/\r?\n/)
  let commits = lines.filter(l => (!l.trim().startsWith('commit')) && l.trim() !== '')
  commits = commits.map(c => {
    const cl = c.split('\t')
    c = { subject: cl[3], hash: cl[0], author: cl[1], date: cl[2], body: cl[4] }
    return c
  })

  return commits
}

module.exports = (fromHash, toHash = 'HEAD') => {
  const range = fromHash ? ` ${fromHash}..${toHash}` : ' --remotes'
  const format = '%h%x09%an%x09%ad%x09%s%x09%b'

  const rawCommits = runAndReturnGitCommand(`git rev-list --pretty=format:${format}${range}`)
  let commits = parseCommits(rawCommits)
  if (commits.length === 0) throw new Error('No changes since last release...')
  // commits = commits.filter(c => !semVer.valid(c.subject)) // Filter out commits which are tags
  commits = commits.filter(c => (c.subject && c.subject.trim() !== '') || (c.body && c.body.trim() !== '')) // Filter out commits with no body or subject

  return commits
}
