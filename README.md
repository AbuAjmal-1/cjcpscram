<p align="center"><img src="https://raw.githubusercontent.com/MercuryWorkshop/scramjet/main/assets/scramjet.png" height="200"></p>

<h1 align="center">Scramjet Demo</h1>

The demo implementation of <a href="https://github.com/MercuryWorkshop/scramjet">Scramjet</a>, the most advanced web proxy.

<a href="https://github.com/MercuryWorkshop/scramjet">Scramjet</a> is an experimental interception based web proxy designed with security, developer friendliness, and performance in mind. This project is made to evade internet censorship and bypass arbitrary web browser restrictions.

#### Refer to <a href="https://github.com/HeyPuter/browser.js">browser.js</a> where this project will now receive updates outside of just bypassing internet censorship.

## Supported Sites

Scramjet has CAPTCHA support! Some of the popular websites that Scramjet supports include:

- [Google](https://google.com)
- [Twitter](https://twitter.com)
- [Instagram](https://instagram.com)
- [Youtube](https://youtube.com)
- [Spotify](https://spotify.com)
- [Discord](https://discord.com)
- [Reddit](https://reddit.com)
- [GeForce NOW](https://play.geforcenow.com/)

Ensure you are not hosting on a datacenter IP for CAPTCHAs to work reliably along with YouTube. Heavy amounts of traffic will make some sites NOT work on a single IP. Consider rotating IPs or routing through Wireguard using a project like <a href="https://github.com/whyvl/wireproxy">wireproxy</a>.

## Netlify Deployment

This project can be deployed to Netlify for static hosting. Note that the WebSocket proxy functionality (`/wisp/`) requires a separate backend server and will not work on Netlify's static hosting alone.

To deploy to Netlify:

1. Fork this repository
2. Connect your repository to Netlify
3. The build will automatically use the configuration in `netlify.toml`
4. The build command `npm install && npm run build` will prepare the static files
5. The `dist` directory will be published

**Note:** For full proxy functionality, you'll need to configure an external WebSocket server and update the `wispUrl` in the frontend code to point to your WebSocket server endpoint.

## Setup / Usage

You will need Node.js 16.x (and above) and Git installed; below is an example for Debian/Ubuntu setup.

```
sudo apt update
sudo apt upgrade
sudo apt install curl git nginx

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 20
nvm use 20

git clone https://github.com/MercuryWorkshop/Scramjet-App
cd Scramjet-App
```

Install dependencies

```
pnpm install
```

Run the server

```
pnpm start
```

Resources for self-hosting:

- https://github.com/nvm-sh/nvm
- https://docs.titaniumnetwork.org/guides/nginx/
- https://docs.titaniumnetwork.org/guides/vps-hosting/
- https://docs.titaniumnetwork.org/guides/dns-setup/

### HTTP Transport

The example uses [libcurl-transport](https://github.com/MercuryWorkshop/libcurl-transport) to fetch proxied data encrypted.

You may also want to use [epoxy-transport](https://github.com/MercuryWorkshop/epoxy-transport), a different way of fetching encrypted data.

This example also now uses [wisp-js/server](https://www.npmjs.com/package/@mercuryworkshop/wisp-js) instead of the now outdated wisp-server-node. Please note that this can also be replaced with other wisp implementations like [wisp-server-python](https://github.com/MercuryWorkshop/wisp-server-python) which is highly recommended for production.

See the [bare-mux](https://github.com/MercuryWorkshop/bare-mux) documentation for more information.
