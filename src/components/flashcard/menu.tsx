"use client"
import { useDeckMenuState } from "@/state/store"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

export default function FCMenu() {
    const { setDeckMenuOpen, isDeckMenuOpen } = useDeckMenuState()
    return (<>
        <Menubar className="absolute">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer font-semibold" onClick={() => {
                    setDeckMenuOpen(!isDeckMenuOpen)
                }}>Decks</MenubarTrigger>
                {/* <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent> */}
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer font-semibold" onClick={() => {
                    // setDeckMenuOpen(!isDeckMenuOpen)
                }}>Reorder</MenubarTrigger>
                {/* <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent> */}
            </MenubarMenu>
        </Menubar>

    </>)
}