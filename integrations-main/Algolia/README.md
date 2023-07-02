# Algolia Script Read Me
The Algolia script consists of a barebones index.html file and most importantly the script.js file with the logic. The script's purpose is to dump the Commerce7 wine JSON data to the site.
![Json data dumped on an empty index.html page](https://user-images.githubusercontent.com/107439981/207158899-51e26142-cd50-4f37-bd22-2b1039c2c504.png)

Above is what the data dump looks like on the page! **NOTE:** If the JSON dump is not loading on the page, refresh the page and open the console using inspect -> console, there should be an initial fetch that retrieves an array with 50 products, and the final array below it 

![Inspect element open with two arrays console logged](https://user-images.githubusercontent.com/107439981/207164687-689d0c7a-7ed0-46d9-a301-fc5329094807.png)
The image above shows the console with a successful JSON dump that includes two arrays.
 
## Manually Add JSON to Algolia
1. Sign In to Algolia
2. Ensure the application you're on is "OSWS-Search"
![Algolia overview page on application OSWS-Search](https://user-images.githubusercontent.com/107439981/207161042-579e2f56-f03e-4357-ba1e-84f7121833a0.png)
3. Scroll down to Index and find and select "C7 Product Feed"
![Algolia page snippet with different indexes ](https://user-images.githubusercontent.com/107439981/207161333-3733e85e-b224-4f9a-87de-dbe383ef1413.png)
4. Add records either manually by copying and pasting the JSON data and upload it to Algolia.
   - Alternatively, you can create a JSON file, copy the JSON dump from the index.html page, paste and format the results in your JSON file, and then upload it to Algolia.
![Algolia page snippet showing options of adding records](https://user-images.githubusercontent.com/107439981/207161579-72fc9201-a2e1-42cd-9800-ab55d2e98096.png)
