<!DOCTYPE html>
<html lang="it">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/minilogo.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Sito web creato con create-react-app" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/minilogo.png" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <title>AgenziaViaggi</title>
  <script>
    if(<?php echo isset($_SESSION['logged']) ? true : false; ?>){
      console.log("ok");
    }
  </script>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>

</html>