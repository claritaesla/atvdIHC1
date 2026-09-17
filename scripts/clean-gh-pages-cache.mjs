import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'

const cache = resolve('node_modules/.cache/gh-pages/https!github.com!claritaesla!atvdIHC1.git')

await rm(cache, { recursive: true, force: true })
