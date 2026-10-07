import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: adapter({ runtime: "nodejs24.x", regions: ["iad1"] }),
      preprocess: [vitePreprocess(), sveltePreprocess({ postcss: true })],
    }),
  ],
};

export default config;
