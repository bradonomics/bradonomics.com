---
title: Configure Linux After Install
description: What software to install and how to setup Linux once you've got the OS installed.
published: false
---

What follows is mostly for me. Every couple of years when I buy a new computer and have to reload my operating system. I want an easy way to remember what to install and how I had it configured. There's little explanation as to _why_ I use the software or configuration settings below, it's just what I like.

**A quick aside:**

If you are new to Linux or thinking to making the switch, keep this in mind when deciding on a distro. You want an easy transition. Get comfortable with Linux first then branch off to an unknown or less friendly distro. This means if you're coming from Mac, use [Ubuntu](http://www.ubuntu.com/) with Gnome desktop. If you're coming from Windows, use [Linux Mint](https://linuxmint.com/) with Cinnamon desktop. They are both based on Debian, have a boat-load of tutorials and forums on the web, and are very similar in setup to what you are already familiar with. Most of the instructions below will work for both systems but all screenshots are from Cinnamon Desktop.

## Desktop Programs to Install

### Chrome

Download here: [https://www.google.com/chrome/](https://www.google.com/chrome/)

### Firefox Developers Edition

By installing the developers edition your default edition will be replaced. If you want to keep both, there are instructions on the web.

```shell
sudo add-apt-repository ppa:ubuntu-mozilla-daily/firefox-aurora
sudo apt update && sudo apt install firefox/trusty
```

In my experience installing Firefox Developers Edition via PPA only works about half the time. No idea why it doesn't work, but when it fails I install it manually. First download the .tar file from the [Mozilla site](https://www.mozilla.org/en-US/firefox/developer/), then extract the file, then move the extracted files to the `/opt` directory, and finally create a symlink so terminal processes can find it. (Note: if the PPA install worked, you won't need to do this.)

```shell
sudo ln -s /opt/firefox/firefox /usr/bin/firefox
```

To have an icon in your menu, you'll need to create a file called `firefox.desktop` in `~/.local/share/applications`. The contents of that file should look like this:

```
[Desktop Entry]
Name=Firefox
GenericName=Firefox Developer Edition
Exec=/opt/firefox/firefox
Terminal=false
Icon=/opt/firefox/browser/icons/mozicon128.png
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

Download the [latest version of redshift from Github](https://github.com/jonls/redshift/releases) and extract it.

Open a terminal in the extracted directory and and type:

```shell
./configure --enable-randr --enable-gui --enable-ubuntu \
```

You will get a `>` prompt. Type:

```shell
--with-systemduserunitdir=$HOME/.config/systemd/user
```

If you get an error about the intltool, you'll need to install the newest version:

```shell
sudo apt install intltool
```

If you get error about missing dependencies for RANDR method, you'll need to install those dependencies:

```shell
sudo apt install libxcb1-dev libxcb-randr0-dev libx11-dev
```

Once all the dependency issues are sorted, run the `./configure` commands again.

Once that's done:

```shell
make
```

Then:

```shell
sudo make install
```

Create `~/.config/redshift.conf` file. Instructions here: [http://jonls.dk/redshift/](http://jonls.dk/redshift/)

Add to Startup Applications

### Calibre

Get terminal install command here: [https://calibre-ebook.com/download_linux](https://calibre-ebook.com/download_linux)

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

```shell
sudo add-apt-repository ppa:maarten-baert/simplescreenrecorder
sudo apt update && sudo apt install simplescreenrecorder
```

### GTK+ UVC Viewer

To have your webcam in screencasts.

```shell
sudo add-apt-repository ppa:pj-assis/ppa
sudo apt update && sudo apt install guvcview
```

### Everpad

```shell
sudo add-apt-repository ppa:nvbn-rm/ppa
sudo apt update && sudo apt install everpad
```

## Development Tools

### Atom

Download here: [http://atom.io](http://atom.io)

Under Edit -> Preferences

 - Change Font Family to [Oxygen Mono](https://www.google.com/fonts/specimen/Oxygen+Mono)
 - Check Scroll Past End
 - Check Show Indent Guide

Under the Theme Settings change the UI Theme to One Dark and the Syntax Theme to One Dark.

Install Packages:

 - [autoprefixer](https://atom.io/packages/autoprefixer)
 - [atom-beautify](https://atom.io/packages/atom-beautify)
 - [todo-show](https://atom.io/packages/todo-show)
 - [open-recent](https://atom.io/packages/open-recent)
 - [merge-conflicts](https://atom.io/packages/merge-conflicts)
 - [git-plus](https://atom.io/packages/git-plus)
 - [linter](https://atom.io/packages/linter)
 - [linter-jshint](https://atom.io/packages/linter-jshint)
 - [linter-php](https://atom.io/packages/linter-php)
 - [php-debug](https://atom.io/packages/php-debug)
 - [highlight-selected](https://atom.io/packages/highlight-selected)
 - [pigments](https://atom.io/packages/pigments)

#### Pigments Edits

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

### GitKraken

Download here: [https://www.gitkraken.com/](https://www.gitkraken.com/)

## Local Development Environment

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

Set touchpad to two-finger scroll

Create a Keyboard Custom Launcher for System Monitor

    Command: gnome-system-monitor
    Shortcut: Ctrl-Shift-Escape (Just like Windows Task Manager)

Remap the Compose key to the Caps Lock for emdash: [http://www.makeuseof.com/tag/type-em-en-dashes-word-processor/](http://www.makeuseof.com/tag/type-em-en-dashes-word-processor/)
