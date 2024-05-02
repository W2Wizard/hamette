<script lang="ts">
    import { Icon, XMark } from "svelte-hero-icons";

    let modal: HTMLDialogElement;

    export function toggle() {
        modal.show();
    }
</script>

<dialog bind:this={modal}>
    <div class="modal-header">
        <h1>Menu</h1>
        <form method="dialog">
            <button class="wui button" type="submit" value="close">
                <Icon src={XMark} size="18px" solid />
            </button>
        </form>
    </div>
    <hr />
    <nav style="flex: 1;">
        <ul>
            <!--<li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>-->
        </ul>
    </nav>

    <div class="footer">
        <p>Made with ❤️ by © 2024 W2Wizard</p>
        <!--<ul>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/pricing">Pricing</a></li>
        </ul>-->
    </div>
</dialog>

<style>
    div.modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    dialog {
        top: 0;
        left: 0;
        margin: 0;
        z-index: 1;

        display: flex;
        flex-direction: column;
        user-select: none;
        position: fixed;

        min-height: 100%;
        min-width: 425px;

        padding: 1rem;
        background-color: var(--wui-shade-01);

        border: 1px solid var(--wui-border);
        border-bottom-right-radius: var(--wui-radius);
        border-top-right-radius: var(--wui-radius);
        border-left: none;

        & div.footer {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            justify-content: center;
            padding: 0.5rem 0;

            & p {
                margin: 0;
                font-size: 0.75rem;
                color: var(--wui-text-02);

                display: inline-flex;
                align-items: center;
            }

            & ul {
                padding: 0;
            }

            & li {
                display: inline-block;
                margin-right: 0.5rem;
                font-size: 0.95rem;
            }
        }

        &:not([open]) {
            pointer-events: none;
            opacity: 0;
        }

        &::backdrop {
            backdrop-filter: blur(2px);
        }

        /* Media query that checks for width or height */
        @media screen and (max-width: 425px), screen and (max-height: 512px) {
            min-width: 100%;
            min-height: 100%;
            border-radius: 0;
            border-right: none;
        }
    }
</style>
