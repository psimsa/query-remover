import { expect, test } from '@playwright/test'

test('extracts first URL from mixed text and strips query params', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('textbox').fill('see here: https://so.me.url/my/path?foo=bar')

  await expect(page.getByText('https://so.me.url/my/path')).toBeVisible()
  await expect(page.getByText('Query parameters will be removed')).toBeVisible()
})
