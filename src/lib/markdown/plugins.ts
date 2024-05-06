// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import rehypeRaw from "rehype-raw"
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

/**
 * A plugin to parse html stuff in markdown.
 * @param options - Options to pass to rehype-raw.
 * @returns A plugin to parse html stuff in markdown.
 */
export const rawPlugin = (
	options: Parameters<typeof rehypeRaw>[0] = {}
): Plugin => ({
	//remarkPlugin: [remarkMath, options],
	rehypePlugin: [rehypeRaw, options],
});

// ============================================================================

/** A list of plugins to parse markdown. */
export default [gfmPlugin(), rawPlugin({})] as Plugin[];
