import { test, expect } from '@playwright/test';

test('deve pesquisar no Amazon com sucesso', async ({ page }) => {
  // 1. Acessa a página do Amazon
  await page.goto('https://www.amazon.com.br');

  // 2. Preenche o campo de busca
  const campoBusca = page.locator('#twotabsearchtextbox');
  await campoBusca.fill('fraldas descartáveis');
  await campoBusca.press('Enter');

  // 3. Valida se o título da página mudou
  await expect(page).toHaveTitle(/fraldas descartáveis/i);
});

test('deve pesquisar no Amazon 1 com sucesso', async ({ page }) => {
  // 1. Acessa a página do Amazon
  await page.goto('https://www.amazon.com.br');

  // 2. Preenche o campo de busca
  const campoBusca = page.locator('#twotabsearchtextbox');
  await campoBusca.fill('pomada bepantol');
  await campoBusca.press('Enter');

  // 3. Valida se o título da página mudou
  await expect(page).toHaveTitle(/pomada bepantol/i);
});