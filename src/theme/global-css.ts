import { defineGlobalStyles } from "@chakra-ui/react";


export default defineGlobalStyles({
  "*::placeholder": {
    opacity: 1,
    color: "fg.subtle",
  },
  "html": {
    scrollbarGutter: "stable"
  },
  "*::selection": {
    bg: "blue.200",
  },
})