import { glyphs } from "@hackclub/icons";

export type AdventureChapter = 'discovery' | 'code'

interface BaseAction {
  title: string,
  /**
   * Defaults to sparkles ("rep").
   */
  icon?: keyof typeof glyphs,
  route: string,
  x: number,
  y: number
}

export interface SidePanelActionData extends BaseAction {
  route: "side-panel",

}

export interface MapTransitionActionData extends BaseAction {
  /**
   * Corresponds to a real action on the site, routed as a page prefixed by /adventure
   * 
   * Ex. `/discovery/getting-started` would look like `http://localhost:3000/adventure/discovery/getting-started`
   */
  route: `/${AdventureChapter}/${string}`,
}

export type ActionData = SidePanelActionData | MapTransitionActionData;

export type Page = {
  title: string,
  id: string,
  options?: {
    "bgColor": string
  },
  layers: string[],
  actions: ActionData[]
}

export type StageConfiguration = {
  [name: string]: Page[],
  discovery: Page[],
  code: Page[]
}