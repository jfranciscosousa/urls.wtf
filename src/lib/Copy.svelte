<script lang="ts">
  type Props = {
    text: string;
  };

  let { text }: Props = $props();
  let copied = $state(false);
  let timeout: number;

  async function handleCopy(): Promise<void> {
    if (navigator.clipboard && window.isSecureContext) {
      // Use the clipboard API if available and the context is secure
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback method for older browsers or insecure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // Avoid scrolling to the bottom
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          console.log("Text copied to clipboard");
        } else {
          console.error("Failed to copy text");
        }
      } catch (err) {
        console.error("Error copying text: ", err);
      }

      document.body.removeChild(textArea);
    }

    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1000);
  }
</script>

<button class="bg-white text-bluePlaza px-2 rounded h-6 w-[80px]" onclick={handleCopy}>
  {#if copied}
    copied
  {:else}
    copy
  {/if}
</button>
