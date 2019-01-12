# Taktsiv

Scripts for scraping bank and credit card details

## Install

```sh
npm install taktsiv
```

## Usage

### Option 1: scrape data

1. define a settings file in `~/.taktsiv/settings.js`:

```js
module.exports = {
  credentials: [
    {
      id: <user identification number>,
      card6Digits: <6 last digits of card>,
      password: <user password>
    }
  ],
  month: <number between 1-12>,
  year: <number>,
  saveLocation: <path to folder where data files will be written>
}
```

2. scrape data by running:

```sh
npx takstiv
```

### Option 2: only process scraped data

1. define a settings file in `~/.taktsiv/settings.js`:

```js
module.exports = {
  year: <number>,
  saveLocation: <path to folder where data files will be written>
}
```

2. process file by running:

```sh
npx taktsiv --file=
```