import { Hasher } from '@/usecases/boundaries/outputs/cryptograph/hasher'
import { HashComparer } from '@/usecases/boundaries/outputs/cryptograph/hash-comparer'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
