import React from 'react';
import { Button, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { OrderItems } from '../types/OrderItem';
import { Order } from '../types/Order';
import { Complement } from '../types/OrderComplements';
import { format } from 'date-fns';
import { mapOrderStatus } from './mappers';
import { OrderData } from '../screens/OrderItem';
import { User } from '../types/User';

export const calculatePercentage = (complements: Complement[], type: 0 | 1, multiplier: 1  | -1) => {
    const percentage = complements
        .filter(el => el.valueType === type && el.complementMultiplier === multiplier)
        .reduce((acc, { value }) => acc * (1 - value / 100), 1);
    return (1 - percentage) * 100;
};

export const calculateValue = (complements: Complement[], type: 0 | 1, multiplier: 1  | -1) => {
    return complements
        .filter(el => el.valueType === type && el.complementMultiplier === multiplier)
        .reduce((acc, { value }) => acc + value * multiplier, 0);
};

export const createAndSharePdf = async (itens: OrderItems[], complements: any[], orderData: OrderData, userData: User) => {
    const value = itens.reduce((a: number, b: any)=>(a + (b.value * b.quantity)), 0);
    const finalDiscountPercentage = calculatePercentage(complements, 0, -1);
    const discountValue = calculateValue(complements, 1, -1);
    const finalTaxPercentage = calculatePercentage(complements, 0, 1);
    const taxValue = calculateValue(complements, 1, 1);
    const finalTaxes = (value * finalTaxPercentage /100) + taxValue;
    const finalDiscounts = (value * finalDiscountPercentage /100) + discountValue;
    console.log(finalDiscounts)
    const finalValue = value - (value * finalDiscountPercentage /100) + (value * finalTaxPercentage /100) + taxValue + discountValue
    const taxes = complements.filter((c)=>c.complementMultiplier == 1);
    const discounts = complements.filter((c)=>c.complementMultiplier == -1)
    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Budget</title>
    <style>
        body {
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: black;
            margin: 0;
            padding: 0;
        }
        .header {
            background-color: white;
            padding: 20px;
            text-align: center;
        }
        .logo {
            width: 100px;
            height: auto;
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }
        .date {
            font-size: 16px;
            margin-left: 20px;
        }
        .table-container {
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #555;
            
        }
        th {
            background-color: white;
            border: 1px solid #555;
            padding: 12px;
        }
        td {
            border: 1px solid #555;
            text-align: left;
        }
        .secondary {
            background-color: white;
        }
        .secondary td {
            text-align: center;
            padding: 5px;
        }
        .secondary:nth-child(even) {
            background-color: #eee;
        }
        .total-row {
            background-color: white;
            font-weight: bold;
        }
        .total-row td{
            padding: 5px;
        }
        .total-row td:nth-child(1) {
            text-align: right;
        }
        .total-row td:nth-child(2) {
            text-align: center;
        }
        .decrease-row td{
            color: #c55;
            text-align: center;
            padding: 5px;
        }
        .decrease-row td:nth-child(1){
            text-align: right;
        }
        .increase-row td{
            text-align: center;
            padding: 5px;
        }
        .increase-row td:nth-child(1){
            text-align: right;
        }
        .notes {
            margin: 20px;
            font-style: italic;
        }
        .budget-data{
            display: flex;
            justify-content: flex-end;
        }
        p{
            font-style: italic
        }   
    </style>
</head>
<body>
    <div class="header">
        <h1>${userData.name}</h1>
        <h1>${orderData.orderStatus > mapOrderStatus('budget') ? 'Pedido' : 'Orçamento'} nº ${orderData.orderNumber}</h1>
    </div>
    <div class="table-container">
        <div class="budget-data">
            <div class="date">Cliente: ${orderData.clientName}</div>
            <div class="date">Data: ${format(orderData.deliveryDate, 'dd/MM/yyyy')}</div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Sub Total</th>
                </tr>
            </thead>
            <tbody>
                ${itens.map((el)=>(
                    `<tr class="secondary">
                        <td>${el.productName}</td>
                        <td>${el.quantity}</td>
                        <td>R$${(el.value).toFixed(2).replace('.',',')}</td>
                        <td>R$${(el.value * el.quantity).toFixed(2).replace('.',',')}</td>
                    </tr>
                    `
                ))}
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="3">Subtotal</td>
                    <td>R$${value.toFixed(2).replace('.',',')}</td>
                </tr>
                ${taxes.map((el)=>(
                    `<tr class="increase-row">
                        <td colspan="3">${el.complementDescription}</td>
                        <td>R$${el.value.toFixed(2).replace('.',',')}</td>
                    </tr>`
                ))}
                ${finalTaxes > 0 ? `
                    <tr class="total-row">
                        <td colspan="3">Total Acréscimos</td>
                        <td>R$${finalTaxes.toFixed(2).replace('.',',')}</td>
                    </tr>
                `:'' }
                ${discounts.map((el)=>(
                    `<tr class="decrease-row">
                        <td colspan="3">${el.complementDescription}</td>
                        <td>${el.valueType == 0 ? '' : 'R$'}${el.value.toFixed(2).replace('.',',')}${el.valueType == 0 ? '%' : ''}</td>
                    </tr>`
                ))}
                ${finalDiscounts < 0 ?
                    `<tr class="total-row">
                        <td colspan="3">Total Desconto</td>
                        <td>-R$${Math.abs(finalDiscounts).toFixed(2).replace('.', ',')}</td>
                    </tr>`
                : ''}
                <tr class="total-row">
                    <td colspan="3">Total</td>
                    <td>R$${finalValue.toFixed(2).replace('.',',')}</td>
                </tr>
            </tfoot>
        </table>
        <p>Nota: ${orderData.note}</p>
    </div>
</body>
</html>

`
    
    
    
    try {
        const { uri } = await Print.printToFileAsync({
            html,
            base64: false,
        });

        console.log('PDF created at: ', uri);

        await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Compartilhe o orçamento WhatsApp',
            UTI: 'com.adobe.pdf',
        });

        console.log('PDF shared successfully');
    } catch (error) {
        console.error('Error generating or sharing PDF:', error);
    }
};