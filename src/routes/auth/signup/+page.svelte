<script lang="ts">
  import Form from "$lib/form.svelte";
  import { Icon, RocketLaunch } from "svelte-hero-icons";
</script>

<p>
  Welcome to hamette, a family tree builder graph. Please enter your email and
  password to get started.
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

  <label for="password">Password</label>
  <input
    type="password"
    minlength={6}
    maxlength={255}
    name="password"
    id="password"
  />

  <label for="password-confirm">Confirm Password</label>
  <input
    type="password"
    name="password-confirm"
    id="password-confirm"
    minlength={6}
    maxlength={255}
  />
  <!--<a href="/auth/signin">Already have an account?</a>-->
  <hr />
  <button type="submit" class="apply center">
    <strong>Apply</strong>
    <Icon src={RocketLaunch} size="20px" solid />
  </button>
</Form>

<style lang="scss">
  button[type="submit"].apply {
    border-radius: var(--wui-radius);
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 8s ease-in-out infinite;
    padding: 8px;
    color: white;
    transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;

    &:hover {
      transform: scale(1.025);
    }

    // Since the linear gradient is -45deg, the glow should be the reverse order
    $glow: 0 0 8px;
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
        filter: drop-shadow($glow #23a6d5);
      }
      33% {
        background-position: 100% 50%;
        filter: drop-shadow($glow #e73c7e);
      }
      66% {
        background-position: 100% 100%;
        filter: drop-shadow($glow #ee7752);
      }
      100% {
        background-position: 0% 50%;
        filter: drop-shadow($glow #23a6d5);
      }
    }
  }
</style>
