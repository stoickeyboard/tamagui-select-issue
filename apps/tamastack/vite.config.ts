import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const shouldExtract = process.env.EXTRACT === '1'

const tamaguiConfig = {
  components: ['@tamagui/sandbox-ui', 'tamagui'],
  config: 'tamagui.config.ts',
  useReactNativeWebLite: true,
}

export default defineConfig({
  clearScreen: true,
  plugins: [
    react(),
    tamaguiPlugin(tamaguiConfig),
    shouldExtract ? tamaguiExtractPlugin(tamaguiConfig) : null,
  ].filter(Boolean),
})
