const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto('https://rites.ritesinsp.com/RBS/Login_Form.aspx');

  // Fill in username and password
  await page.type('#txtUname', 'CRTECH');
  await page.type('#txtPwd', 'BSPINSCR');
  await page.keyboard.press('Enter');
  
  await page.waitForTimeout(5000);
  const allPages = await browser.pages();

  let Main_Page = null;
  for (const page of allPages) {
    const pageUrl = page.url();
    if(pageUrl === "https://rites.ritesinsp.com/RBS/MainForm.aspx?Role=1"){
      Main_Page = page
    }
    // console.log(`Page URL: ${pageUrl}`);
    
    // You can perform actions on each page here
  }
  await Main_Page.screenshot({ path: 'screenshot.png' });

  const hoverText1 = 'TRANSACTIONS';
  const hoverText2 = 'Inspection & Billing';
  const clickText = 'Purchase Order Form';

  const hoverDiv1 = await Main_Page.$x(`//div[contains(text(), '${hoverText1}')]`);

  await hoverDiv1[0].hover();

  const hoverDiv2 = await Main_Page.$x(`//div[contains(text(), '${hoverText2}')]`);

  await hoverDiv2[0].hover();

  const clickDiv = await Main_Page.$x(`//div[contains(text(), '${clickText}')]`);
    
      
  await clickDiv[0].click();

  await page.waitForTimeout(5000);

  let PO_Page = null
  for (const page of allPages) {
    const pageUrl = page.url();
    if(pageUrl === "https://rites.ritesinsp.com/RBS/PurchesOrder1_Form.aspx"){
      PO_Page = page
    }
    // console.log(`Page URL: ${pageUrl}`);
    
    // You can perform actions on each page here
  }


  
  await PO_Page.type('#txtCsNo', '121356');




  





  
  // await browser.close();
})();
