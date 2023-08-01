import { Anchor, Button, H1, Paragraph, Separator, useToastController } from '@my/ui'
import React from 'react'
import { useLink } from 'solito/link'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

import { useMemo, useState } from 'react'

import { Adapt, Label, Select, SelectProps, Sheet, XStack, YStack, getFontSize } from 'tamagui'

import { LinearGradient } from 'tamagui/linear-gradient'
export function SelectDemo() {
  return (
    <YStack space>
      <XStack ai="center" space>
        <Label f={1} fb={0}>
          Custom
        </Label>

        <SelectDemoItem />
      </XStack>
      <XStack ai="center" space>
        <Label f={1} fb={0}>
          Native
        </Label>

        <SelectDemoItem native />
      </XStack>
    </YStack>
  )
}
function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState('apple')
  return (
    <Select id="food" value={val} onValueChange={setVal} {...props}>
      <Select.Trigger width={180} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>

          <Sheet.Overlay />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', '$backgroundTransparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>
        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Fruits</Select.Label>

            {/* for longer lists memoizing these is useful */}

            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                      <Select.ItemText>{item.name}</Select.ItemText>

                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),

              [items]
            )}
          </Select.Group>

          {/* Native gets an extra icon */}

          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown size={getFontSize((props.size ?? '$true') as any)} />
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$backgroundTransparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}
const items = [
  { name: 'Apple' },

  { name: 'Pear' },

  { name: 'Blackberry' },

  { name: 'Peach' },

  { name: 'Apricot' },

  { name: 'Melon' },

  { name: 'Honeydew' },

  { name: 'Starfruit' },

  { name: 'Blueberry' },

  { name: 'Raspberry' },

  { name: 'Strawberry' },

  { name: 'Mango' },

  { name: 'Pineapple' },

  { name: 'Lime' },

  { name: 'Lemon' },

  { name: 'Coconut' },

  { name: 'Guava' },

  { name: 'Papaya' },

  { name: 'Orange' },

  { name: 'Grape' },

  { name: 'Jackfruit' },

  { name: 'Durian' },
]

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>

        <Separator />
        <Paragraph ta="center">
          Made by{' '}
          <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman
          </Anchor>
          ,{' '}
          <Anchor
            color="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>

      <SheetDemo />
      <SelectDemoItem />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
