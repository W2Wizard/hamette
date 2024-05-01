<script>
  import Form from "$lib/form.svelte";
  import { ArrowUturnRight, Icon } from "svelte-hero-icons";

  let { data } = $props();
</script>

{#if data.token}
  <p>
    Enter your new password and confirm it.
    Make sure it's at least 6 characters long and please remember it this time.
  </p>
  <Form method="post" style="max-width: 400px;">
    <input type="hidden" name="token" value={data.token} />
    <label for="password">New Password</label>
    <input
      type="text"
      minlength={6}
      maxlength={255}
      name="password"
      id="password-:init:"
      required
    />

    <label for="password">Confirm Password</label>
    <input
      type="text"
      minlength={6}
      maxlength={255}
      name="password"
      id="password-:confirm:"
      required
    />
    <hr />
    <button
      type="submit"
      formaction="/auth/forgot?/reset"
      style="width: 100%; justify-content: center;"
    >
      <Icon src={ArrowUturnRight} size="16px" solid />
      Reset
    </button>
  </Form>
{:else}
  <p>
    Please enter your email address to reset your password. We'll send you a
	link to reset it.
  </p>
  <Form method="post" style="max-width: 400px;">
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      required
      title="Insert a valid email."
    />
    <hr />
    <button
      type="submit"
      formaction="/auth/forgot?/request"
      style="width: 100%; justify-content: center;"
    >
      Request
    </button>
  </Form>
{/if}

<style>
  .forgot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
