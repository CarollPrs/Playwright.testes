import { test, expect } from '@playwright/test';

test.describe('Formulário de Cadastro de Clientes', () => {

  test.beforeEach(async ({ page }) => {
    // Altere para o caminho/URL onde o index.html está rodando
    await page.goto('file:///C:/Users/CAPIRES/OneDrive%20-%20Capgemini/Desktop/index.html'); 
    
  });

  test('CT-01 e CT-02: Deve cadastrar cliente com sucesso', async ({ page }) => {
    await page.locator('#nome').fill('Carlos');
    await page.locator('#sobrenome').fill('Silva');
    await page.locator('#nascimento').fill('1990-05-15');
    await page.locator('#endereco').fill('Rua das Flores, 123');

    await page.locator('#btnSalvar').click();

    await expect(page.locator('#mensagem-sucesso')).toBeVisible();
    await expect(page.locator('#erro-nome')).toBeHidden();
    await expect(page.locator('#erro-sobrenome')).toBeHidden();
  });

  test('CT-03: Deve exibir erros ao tentar salvar formulário em branco', async ({ page }) => {
    await page.locator('#btnSalvar').click();

    await expect(page.locator('#erro-nome')).toBeVisible();
    await expect(page.locator('#erro-sobrenome')).toBeVisible();
    await expect(page.locator('#mensagem-sucesso')).toBeHidden();
  });

  test('CT-06: Não deve aceitar campos obrigatórios apenas com espaços', async ({ page }) => {
    await page.locator('#nome').fill('   ');
    await page.locator('#sobrenome').fill('   ');

    await page.locator('#btnSalvar').click();

    await expect(page.locator('#erro-nome')).toBeVisible();
    await expect(page.locator('#erro-sobrenome')).toBeVisible();
    await expect(page.locator('#mensagem-sucesso')).toBeHidden();
  });

  test('CT-07: Deve limpar as mensagens de erro após corrigir os dados', async ({ page }) => {
    // 1. Gera o erro
    await page.locator('#btnSalvar').click();
    await expect(page.locator('#erro-nome')).toBeVisible();

    // 2. Corrige os dados e envia novamente
    await page.locator('#nome').fill('Ana');
    await page.locator('#sobrenome').fill('Costa');
    await page.locator('#btnSalvar').click();

    // 3. Valida se os erros sumiram e o sucesso apareceu
    await expect(page.locator('#erro-nome')).toBeHidden();
    await expect(page.locator('#erro-sobrenome')).toBeHidden();
    await expect(page.locator('#mensagem-sucesso')).toBeVisible();
  });

});