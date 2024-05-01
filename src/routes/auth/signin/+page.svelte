<script lang="ts">
  import Form from "$lib/form.svelte";
  import { ArrowRight, Icon } from "svelte-hero-icons";
</script>

<Form method="post" style="max-width: 400px;">
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    id="email"
    required
    title="Insert a valid email."
  />

  <label for="password">
    <span class="forgot">
      Password
      <a href="/auth/forgot">Forgot Password</a>
    </span>
  </label>
  <input
    type="password"
    minlength={6}
    maxlength={255}
    name="password"
    id="password"
  />
  <!--<a href="/auth/signup">Don't have an account?</a>-->
  <hr />
  <button type="submit" style="width: 100%; justify-content: center;">
    Login
    <Icon src={ArrowRight} size="16px" solid />
  </button>
</Form>

<style>
  .forgot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    color: var(--color-primary);
  }
</style>
