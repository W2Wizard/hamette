<script lang="ts">
  import {
    Icon,
    CodeBracket,
    ListBullet,
    Link,
    PencilSquare,
    Document,
  } from "svelte-hero-icons";
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import MarkdownViewer from "./markdown-viewer.svelte";
  import Bold from "$lib/icons/icon-bold.svelte";
  import Heading from "$lib/icons/icon-heading.svelte";
  import Italic from "$lib/icons/icon-italic.svelte";
  import MarkdownIcon from "$lib/icons/icon-markdown.svelte";

  interface Props extends HTMLTextareaAttributes {
    md?: string;
    resizable?: boolean;
  }

  let {
	md = $bindable(""),
	resizable = true,
	...rest
  }: Props = $props();

  let isEditing = $state(true);
  let textElement: HTMLTextAreaElement;
  function getTextElement() {
    return {
      start: textElement.selectionStart,
      end: textElement.selectionEnd,
      text: textElement.value,
      before: textElement.value.substring(0, textElement.selectionStart),
      after: textElement.value.substring(
        textElement.selectionEnd,
        textElement.value.length
      ),
    };
  }

  function applyFormatting(prefix: string, suffix: string, offset: number) {
    const { start, end, text, before, after } = getTextElement();
    md = `${before}${prefix}${text.substring(start, end)}${suffix}${after}`;
    textElement.selectionStart = start + offset;
    textElement.selectionEnd = end + offset;
    textElement.focus();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key !== "Enter") return;

    const { start, end, before, after } = getTextElement();
    const lastNewLineIndex = before.lastIndexOf("\n");
    const previousLine = before.substring(lastNewLineIndex + 1);
    if (previousLine && previousLine.startsWith("- ")) {
      md = `${before}\n- ${after}`;
      textElement.selectionStart = start + 2;
      textElement.selectionEnd = end + 2;
      textElement.focus();
      e.preventDefault();
    }
  }
</script>

<div class="md-editor">
  <nav>
    <menu class="toggles">
      <li>
        <button
          title="Switch to editing mode"
          class="center"
          type="button"
          class:selected={isEditing}
          onclick={() => (isEditing = true)}
        >
          <Icon src={PencilSquare} size="16px" solid />
          Editor
        </button>
      </li>
      <li>
        <button
          title="Switch to preview mode"
          class="center"
          type="button"
          class:selected={!isEditing}
          onclick={() => (isEditing = false)}
        >
          <Icon src={Document} size="16px" solid />
          Preview
        </button>
      </li>
    </menu>

    {#if isEditing}
      <div class="actions">
        <menu>
          <button
            title="Heading"
            class="center"
            type="button"
            onclick={() => applyFormatting("### ", "", 2)}
          >
            <Heading />
          </button>
          <button
            title="Bold"
            class="center"
            type="button"
            onclick={() => applyFormatting("**", "**", 4)}
          >
            <Bold />
          </button>
          <button
            title="Italic"
            class="center"
            type="button"
            onclick={() => applyFormatting("*", "*", 1)}
          >
            <Italic />
          </button>
          <hr />
          <button
            title="Code"
            class="center"
            type="button"
            onclick={() => applyFormatting("`", "`", 1)}
          >
            <Icon src={CodeBracket} size="16px" />
          </button>
          <button
            title="List"
            class="center"
            type="button"
            onclick={() => applyFormatting("- ", "", 2)}
          >
            <Icon src={ListBullet} size="16px" />
          </button>
          <button
            title="Link"
            class="center"
            type="button"
            onclick={() => applyFormatting("[", "](url)", 1)}
          >
            <Icon src={Link} size="16px" />
          </button>
          <hr />

          <!-- TODO: Make a dialog to show the markdown rules? -->
          <div title="Markdown is supported!" style="cursor: help;">
            <button inert class="center" onclick={() => (md = "")}>
              <MarkdownIcon />
            </button>
          </div>
        </menu>
      </div>
    {/if}
  </nav>

  <!-- NOTE(W2): We don't use {#if} because we need the height to remain. -->
  <div class="body">
    <div hidden={!isEditing}>
      <textarea
        style="resize: {resizable ? 'vertical' : 'none'};"
        placeholder="Enter text here..."
        onkeypress={onKeydown}
        bind:this={textElement}
        bind:value={md}
        {...rest}
      >
      </textarea>
    </div>
    <div class="preview" hidden={isEditing}>
      <MarkdownViewer {md} />
    </div>
  </div>
</div>

<style>
  li {
    list-style: none;
  }

  textarea {
    display: block;
    border: none;
    background: var(--wui-shade-01);
    padding: 16px;
    width: 100%;
    height: 100%;
    outline: none;
    color: var(--wui-foreground-color);
    border-bottom-left-radius: var(--wui-radius);
    border-bottom-right-radius: var(--wui-radius);
    border: 1px solid var(--wui-border-color);
    border-top: none;
    min-height: 100px;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    border-top-left-radius: calc(var(--wui-radius) - 1px);
    border-top-right-radius: calc(var(--wui-radius) - 1px);
    border: 1px solid var(--wui-border-color);
    background: var(--wui-shade-02);
    justify-content: space-between;
  }

  div.actions {
    display: flex;
    gap: 4px;
    align-items: center;
    padding-inline-end: 8px;

    & menu {
      display: flex;
      gap: 4px;
    }

    & button {
      border: none;
      appearance: none;
      background: none;

      border-radius: var(--wui-radius);

      cursor: pointer;
      width: 28px;
      height: 28px;
      justify-content: center;
      color: var(--wui-text-01);

      &:hover {
        background: var(--wui-shade-03);
      }

      /*&:focus-visible {
        outline: var(--outline);
        outline-offset: var(--outline-offset);
      }*/
    }
  }

  menu.toggles {
    height: 32px;
    display: flex;

    transition: none;
    box-sizing: none;

    & li {
      &:first-child button {
        border-top-left-radius: 4px;
      }

      & button {
        border: none;
        appearance: none;
        background: none;
        padding: 8px 16px;
        cursor: pointer;
        outline: none;
        color: var(--wui-text-01);

        &:hover {
          background: var(--wui-shade-03);
        }

        /*&:focus-visible {
          outline: var(--outline);
          outline-offset: var(--outline-offset);
        }*/
      }

      & button.selected {
        border-bottom: none;
        height: 100%;
        box-shadow: inset 0 -2px 0 var(--wui-primary);
      }
    }
  }

  div.body .preview {
    background: var(--wui-shade-01);
    border-bottom-left-radius: var(--wui-radius);
    border-bottom-right-radius: var(--wui-radius);
    border: 1px solid var(--wui-border-color);
    border-top: none;
    padding: 16px;
    min-height: 100px;
    word-break: break-all;
    overflow-y: auto;
    color: var(--wui-foreground-color);
  }
</style>
