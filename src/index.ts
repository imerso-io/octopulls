import * as core from '@actions/core'
import * as github from '@actions/github'
import { logger } from './libs'

;(async function run () {
  try {
  const token = core.getInput('PAT_TOKEN')
  const octokit = github.getOctokit(token)
  const pullRequest = github.context.payload.pull_request

  if (!pullRequest) throw core.error

  const pullNumber = pullRequest.number

  const { owner, repo } = github.context.repo

  await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber
  })
  } catch (err) {
    logger.error(err)
  }
})()