<h1>Algolia Script Read Me</h1>
<p>
  The Algolia script consist of a barebones index.html file and most importantly the script.js file with the logic. The script's purpose is to dump the Commerce7 wine JSON data to the site.
</p>

![image](https://user-images.githubusercontent.com/107439981/207158899-51e26142-cd50-4f37-bd22-2b1039c2c504.png)

<p>
  Above is what the data dump looks like on the page! <strong>NOTE:</strong> If the JSON dump is not loading on the page, refresh the page and open the console using inspect -> console, there should be an initial fetch which retrieves an array with 50 products, and the final array below it 
</p>

![image](https://user-images.githubusercontent.com/107439981/207164687-689d0c7a-7ed0-46d9-a301-fc5329094807.png)

<caption>The image shows the console of a successful JSON dump with two arrays.</caption>
 
 <h2>Manually Add JSON to Algolia</h2>
 <ol>
  <li>Sign In to Algolia</li>
  <li>Ensure the application you're on is "OSWS-Search"</li>
  
  ![image](https://user-images.githubusercontent.com/107439981/207161042-579e2f56-f03e-4357-ba1e-84f7121833a0.png)

  <li>Scroll down to Index and find and select "C7 Product Feed"</li>
  
  ![image](https://user-images.githubusercontent.com/107439981/207161333-3733e85e-b224-4f9a-87de-dbe383ef1413.png)

  <li>Add records either manually by copying and pasting the JSON data or make a JSON file and upload it to Algolia.</li>
  
  ![image](https://user-images.githubusercontent.com/107439981/207161579-72fc9201-a2e1-42cd-9800-ab55d2e98096.png)

 <ol>
