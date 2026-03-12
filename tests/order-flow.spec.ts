import { test, expect } from '@playwright/test';

const CUSTOMER = {
  name: 'Test Order',
  address: 'Test Street',
  phone: '01317622631',
};

test('Order flow — product page → checkout → confirmation', async ({ page }) => {

  // STEP 1: Go to product page
  await page.goto('https://regalwatchbd.com/product/wooden-wall-clock-split-panel-design/');
  await expect(page.getByRole('button', { name: 'Buy Now' })).toBeVisible();

  // STEP 2: Click Buy Now (goes directly to checkout)
  await page.getByRole('button', { name: 'Buy Now' }).click();
  await expect(page).toHaveURL(/checkout/);

  // STEP 3: Fill billing details
  await page.getByRole('textbox', { name: 'Name' }).fill(CUSTOMER.name);
  await page.getByRole('textbox', { name: 'Street address' }).fill(CUSTOMER.address);
  await page.getByRole('textbox', { name: 'Phone' }).fill(CUSTOMER.phone);

  // STEP 4: Select shipping zone
  await page.getByRole('radio', { name: 'Outside Dhaka' }).check();
  await expect(page.getByRole('radio', { name: 'Outside Dhaka' })).toBeChecked();

  // STEP 5: Place order
  await page.getByRole('button', { name: 'Place order' }).click();

  // STEP 6: Confirm order success
await expect(page).toHaveURL(/thank-you\/order-received/);
await expect(page).toHaveTitle('Thank you - Regal watch');
});

//step 7