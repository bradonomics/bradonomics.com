---
title: Configure Linux After Install
description: What software to install and how to setup Linux once you've got the OS installed.
type: article
tags: ['Technology', 'Linux']
last_modified_at: 2021-09-14
date: 2016-05-12
---

What follows is mostly for me. Every couple of years when I have to reload my operating system, I want an easy way to remember what to install and how I had it configured. There is no explanation as to _why_ I use the software or configuration settings below, it's just what I like.

I've written some install and config scripts that do most of the below. One day I'll get them uploaded to [my dotfiles](https://github.com/bradonomics/dotfiles).

## Desktop Programs to Install

### Chrome

Download here: [https://www.google.com/chrome/](https://www.google.com/chrome/)

### Firefox Developers Edition

Do not use a PPA. The PPA will replace your default edition

Download the .tar file from the [Mozilla site](https://www.mozilla.org/en-US/firefox/developer/), then extract the file, then move the extracted files to `~/.local/bin`, and finally create a symlink so terminal processes can find it.

```shell
sudo ln -s ~/.local/bin/firefox /usr/bin/firefox
```

To have the app show in your menu, you'll need to create a file called `firefox.desktop` in `~/.local/share/applications`. The contents of that file should look like this:

```
[Desktop Entry]
Name=Firefox
GenericName=Firefox Developer Edition
Exec=/usr/bin/firefox
Terminal=false
Icon=/usr/bin/firefox/browser/icons/mozicon128.png
Type=Application
Categories=Application;Network;X-Developer;
Comment=Firefox Developer Edition Web Browser.
```

### Skype

Skype for Linux hasn't been updated in many years. The version in the Software Manager is the newest version available.

### Deluge

Older versions available via the Software Manager, but the newest versions are in the PPA:

```shell
sudo add-apt-repository ppa:deluge-team/ppa
sudo apt update && sudo apt install deluge
```

### Redshift

Redshit now comes pre-installed on Linux Mint. If you wish to change the default options, you'll need to create a config file. Instructions here: <http://jonls.dk/redshift/#configuration-file>.

### Calibre

Get terminal install command here: <https://calibre-ebook.com/download_linux>

### VLC

Installed by default with Linux Mint; otherwise it should be available in the Software Manager.

#### Codec for h.265

If you get an error when playing a movie along the lines of:

```
Codec not supported:
VLC could not decode the format "hevc"...
```

You'll need to install the libde265 HEVC codec; [libde265](http://www.libde265.org/) is an open source implementation of the h.265 video codec.

```shell
sudo apt-add-repository ppa:strukturag/libde265
sudo apt update && sudo apt install vlc-plugin-libde265
```

### Simple Screen Recorder

The version in the Linux Mint Software Manager is hella out-of-date. Use Maarten's PPA:

```shell
sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder
sudo apt update && sudo apt install simplescreenrecorder
```

### Cheese WebCam Viewer

To record webcam video, take photos, or have your webcam in screencasts: <https://help.gnome.org/users/cheese/stable/>

```shell
sudo apt-get install cheese
```

### Evernote

If you know of an alternative desktop app for Evernote or an alternative to Evernote, please get in touch.

## Development Tools

### Atom

Atom has a PPA. The instructions are here: <https://packagecloud.io/AtomEditor/atom/install>

If you get errors you can manually add it to your software sources by creating `/etc/apt/sources.list.d/atom.list` and adding `deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main`. Then run `sudo apt update && sudo apt install atom`.

Failing that, you can download it here: [http://atom.io](http://atom.io)

All my settings are in a [gist created by the sync-settings plugin](https://gist.github.com/bradonomics/cc4c80f1849a1e0ec669e24271e4a8fd).

#### Pigments Edits

Note: I don't do this anymore, but I'm leaving it here for posterity.

Under Pigments Preferences change Marker Type to "dot".

Then click Edit -> Stylesheet and add the following to adjust pigment's dot display.

```css
atom-text-editor::shadow pigments-markers::shadow pigments-color-marker.dot,
pigments-markers::shadow pigments-color-marker.dot,
pigments-color-marker.dot {
  transform: translate(0, -50%) scale(.7);
}
```

While you're in the stylesheet, add the following so the tab sizes are a normal width and not only the size of the file name.

```css
[theme-one-dark-ui-tabsizing="auto"] .tab,
[theme-one-dark-ui-tabsizing="auto"] .tab.active {
  flex: 1;
}
```

### Sublime Merge

Install instructions here: <https://www.sublimemerge.com/>.

## Local Development Environment

**NOTE**: I no longer do WordPress development so the LAMP install instructions may be out of date.

### Apache, MySQL, PHP, phpMyAdmin

```shell
sudo apt install apache2 php php-curl php-gd php-cli mysql-server phpmyadmin
```

Add the following to `/etc/hosts` (or whatever you want your local development url to be.)

```
127.0.0.1    local.dev
```

Create a phpinfo file in `var/www/html` to easily check PHP settings:

```php
<?php

phpinfo();
```

You'll need to change the owner of the files in `/var/www` to your user in order to keep WordPress from asking for FTP credentials when installing themes or plugins. (There are other workarounds for this but I find this method easiest on my local machine.)

```shell
sudo adduser $USER www-data
sudo chown -R "$USER":www-data /var/www
```

```shell
sudo nano /etc/apache2/envvars
```

Once nano opens, change the following lines. Make sure "username" is _your_ username.

```
export APACHE_RUN_USER=username
export APACHE_RUN_GROUP=www-data
```

Navigate to `/etc/apache2/sites-available/000-default.conf`. Add the below to enable Apache mod_rewrite.

```
<Directory /var/www/html>
  Options Indexes FollowSymLinks MultiViews
  AllowOverride All
  Order allow,deny
  allow from all
</Directory>
```

Next, we need to enable the rewrite module, which will keep WordPress from asking for FTP credentials. You can do this by typing:

```shell
sudo a2enmod rewrite
```

### WP CLI

Get the official [install instructions here](https://wp-cli.org/docs/installing/).

WP-CLI is available as a PHP Archive file (.phar). You can download it using either wget or curl commands:

```shell
wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
```

You need to make this .phar file executable and move it to `/usr/local/bin` so that it can be run directly:

```shell
chmod +x wp-cli.phar && sudo mv wp-cli.phar /usr/local/bin/wp
```

Setup Bash completion:

```shell
cd ~/ && wget https://github.com/wp-cli/wp-cli/raw/master/utils/wp-completion.bash
```

Edit the .bashrc file so that it is loaded by the shell every time you login:

```shell
echo "# WP CLI Auto Complete" >> .bashrc
echo "source /home/$USER/wp-completion.bash" >> .bashrc
```

### Node & NPM

Install instructions here: [https://github.com/nodesource/distributions#debinstall](https://github.com/nodesource/distributions#debinstall) (In my experience these instructions will not work on Ubuntu.)

### Ruby

Best instructions I've found for installing Ruby are here: [https://gorails.com/setup/](https://gorails.com/setup/)

## Other Cinnamon Configurations

(This section is a bit messy. I'll make sense of it later.)

Set Number of Workspaces to 3:

```
gsettings set org.cinnamon.desktop.wm.preferences num-workspaces 3
```

Set Workspace switcher to Ctrl+Shift+s

Create a Keyboard Custom Launcher for System Monitor

    Command: gnome-system-monitor
    Shortcut: Ctrl-Shift-Escape (Just like Windows Task Manager)

Remap the Compose key to the Caps Lock for emdash: [http://www.makeuseof.com/tag/type-em-en-dashes-word-processor/](http://www.makeuseof.com/tag/type-em-en-dashes-word-processor/)
