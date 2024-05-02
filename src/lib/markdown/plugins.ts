// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import { gfmPlugin as exGFM } from "svelte-exmarkdown/gfm";
import type { Plugin } from "svelte-exmarkdown/types";

// ============================================================================

/**
 * A plugin to parse github flavored markdown.
 * @param options - Options to pass to remark-gfm.
 * @returns A plugin to parse github flavored markdown.
 *
 * @note Re-exports from svelte-exmarkdown/gfm.
 */
export const gfmPlugin = exGFM;

// Find and replace keywords in the rubric

/**
 * Parse the markdown file as a NXDM-Rubric
 * NXDM Rubric should be designed with a spec in mind atm, we yolo it.
 *
 * # Did user do X?
 * Users should have done xyz la la la bla bla bla
 * <Toggle/>
 *
 * <Decision>
 * 	<Pass />
 *  <MemoryLeak />
 *  <Failed Compile />
 * </Decision>
 * @returns
 */
//export const examplePlugin = (): Plugin => ({
//	remarkPlugin: [(e) => {
//		console.log("HI!", e)
//	}],
//	rehypePlugin: [(e) => {
//		console.log("HO", e)
//	}]
//});

// ============================================================================

/** A list of plugins to parse markdown. */
export default [gfmPlugin()] as Plugin[];
