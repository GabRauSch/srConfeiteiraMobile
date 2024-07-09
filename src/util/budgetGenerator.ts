import React from 'react';
import { Button, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { OrderItems } from '../types/OrderItem';
import { Order } from '../types/Order';





export const createAndSharePdf = async (itens: OrderItems[], complements: any[]) => {
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
            padding: 12px;
            border: 1px solid #555;
            text-align: left;
        }
        .secondary {
            background-color: white;
        }
        .secondary td {
            text-align: center;
        }
        .secondary:nth-child(even) {
            background-color: #eee;
        }
        .total-row {
            background-color: white;
            font-weight: bold;
        }
        .total-row td:nth-child(1) {
            text-align: right;
        }
        .total-row td:nth-child(2) {
            text-align: center;
        }
        .increase-row td{
            text-align: center;
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
    </style>
</head>
<body>
    <div class="header">
        <h1>Orçamento</h1>
    </div>
    <div class="table-container">
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
                        <td>R$${el.value}</td>
                        <td>R$${el.value * el.quantity}</td>
                    </tr>
                    `
                ))}
            </tbody>
            <tfoot>
                ${complements.filter((c)=>c.valueType == 1).map((el)=>(
                    `<tr class="increase-row">
                        <td colspan="3">${el.description}</td>
                        <td>${el.value}</td>
                    </tr>`
                ))}
                <tr class="total-row">
                    <td colspan="3">Total Acréscimos</td>
                    <td>R$${complements.reduce((a, b)=>a + b.value, 0)}</td>
                </tr>
                ${complements.filter((c)=>c.valueType == 0).map((el)=>(
                    `<tr class="increase-row">
                        <td colspan="3">${el.description}</td>
                        <td>${el.value}</td>
                    </tr>`
                ))}
                <tr class="total-row">
                    <td colspan="3">Total Desconto</td>
                    <td>R$${complements.reduce((a, b)=>a + b.value,0)}</td>
                </tr>
                <tr class="total-row">
                    <td colspan="3">Total</td>
                    <td>R$${itens.reduce((a, b)=>a + (b.value * b.quantity), 0)}</td>
                </tr>
            </tfoot>
        </table>
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