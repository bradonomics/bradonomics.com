---
title: How I Take Notes
description:
# type: note article
tags: ['Writing', 'Note Taking']
last_modified_at: 2021-10-04
date: 2021-09-14
---

This needs to be in here somewhere: <https://benmauk.substack.com/p/18-in-which-the-traveller-takes-a>

A few quotes:

> You must never think "where is my notebook" much less "which notebook/notes doc/app/file should I put this in" when a thought strikes. The writing must feel like an immediate extension of the mind.

> I will never love my phone, or even much like it, but I am compelled to use it in ways not just wholly different from but in active conflict with my compulsion to write about the world. For this reason, it is important to me that, despite slick corporate efforts toward unifying in one convenient object all human tools of creation and consumption—and despite the fact that I keep both on me at all times—it is important that the notebook and smartphone never merge.

> The thing you take notes on should not get emails.

> Whenever I have tried to take notes on a phone, I am always urged to do something else: to Google something, to look up a definition or translation, to send a text or take a picture. The phone can do everything except permit me to be bored, or to exist in a prolonged state of unknowing. By contrast, a notebook refuses the urge to look elsewhere at the moment of frustration.


## Default to Analog

I use a three notebook system. The first is a 3.5-by-5 inch book that I carry everywhere. I use it to remember books I want to read, bits of conversation I overhear at coffee shops, people's phone numbers, directions[^1], and anything else that pops into my mind. The second is a 4-by-6 inch logbook. It's little more than a record of things I did and places I went. It includes to-do lists, but rarely includes notes. The third is a 8.5-by-11 inch composition notebook. It is where I write long form thoughts.

## Publishing Ideas to the Web

- <https://fortelabs.co/blog/how-to-use-evernote-for-your-creative-workflow/>
- <https://zettelkasten.de/posts/overview/>

I intend to publish something here about the new system soon. The key components are these:

## Atom Writer Profile

I use Atom as my primary code editor. Things I find useful when writing code are not so useful when writing prose. I keep a separate profile for writing by creating a `.atom-writer` directory in my $HOME directory. I create a function in my `~/.functions` file to set `ATOM_HOME` to the `~/.atom-writer` profile when I want to write.

```shell
write() {  
  export ATOM_HOME="$HOME/.atom-writer" # Set the Atom profile to writer
  command atom $HOME/writing # open Atom in my writing directory
  export ATOM_HOME="$HOME/.atom" # Set the Atom profile back to default
}
```

### zen-plus

I used to use a program called [ghostwriter](https://wereturtle.github.io/ghostwriter/). I liked the distraction free writing, but another feature I really liked was how the line you are typing stays in the center of the screen. This plugin does the same in Atom: <https://atom.io/packages/zen-plus>.

## MarkDownload

Evernote, Joplin, and others have web clippers to save other people's writing to your notes. I use [Markdownload](https://addons.mozilla.org/en-US/firefox/addon/markdownload/).

## TagSpaces

Evernote, Joplin, and others have tagging systems. I use tags in the frontmatter of my files and use the search feature in Atom to find them. If you want a GUI system for tagging, you might try [TagSpaces](https://www.tagspaces.org/).

## Note Taking App for Linux

Evernote is the top player in this space but they have no Linux desktop version[^2]. The other issue with Evernote is, they don't play well with others. If you want to export your files, there is no option to do so from their web client. You have to install a desktop application ... which, as I mentioned, isn't available for Linux. I also don't believe they export in Markdown.

[Joplin](https://joplinapp.org/) is the best alternative I've found.

**Benefits**

- Notebooks and tags
- Sync your note files to your provider of choice. No vender lock-in.
- Web clipper (Chrome & FireFox).
- File history (restore previous versions).

**Drawbacks**

- The biggest con to me is, there is no way to sync my notes in Joplin with the files in another directory. So, for example, if I have published something to bradonomics.com and have that article in my `~/projects/bradonomics.com/articles` directory, it doesn't sync with that note in Joplin.
- Inner linking can be done, but not by typing the note name as you might expect. You must first visit the note to be linked to, copy the note ID, then use a colon followed by a slash followed by the note ID like so: `[link text](:/7ca3750791aa4f2eb7d4a3)`.
- You can't search for the notes by ID.
- Using the mouse wheel to scroll in viewer mode is hella janky.

---

## Footnotes

[^1]: Most people store phone numbers in their phone and use a GPS for directions from the same gadget, but [I don't have a cell phone](/single-function-devices/).

[^2]: Evernote originally said they had no intention of building a Linux app: <https://web.archive.org/web/20200809021856/https://help.evernote.com/hc/en-us/articles/208313748-Evernote-for-Linux>. By May of 2021, they decided to get in the game and offer a private beta: <https://web.archive.org/web/20200809021856/https://help.evernote.com/hc/en-us/articles/208313748-Evernote-for-Linux>.
