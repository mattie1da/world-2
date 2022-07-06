interface crumb {
  text: string,
  href: string
}

export interface BreadcrumbInterface {
  crumbs: Array<crumb>
  current: string
}