/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-expressions */
import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'client' || role === 'admin') {
    can('manage', 'all')

    // colocado no codigo pra evitar o erro de variavel sem uso
    subject

    // comentado pra resolvar depois quando tiver pagina de administração
    // }
    // else if (role === 'client') {
    //   can(['read'], 'acl-page')
    // } else {
    //   can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: (object) => object!.type,
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all',
}

export default defineRulesFor
