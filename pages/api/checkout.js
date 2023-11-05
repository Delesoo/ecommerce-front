import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handler(req,res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
    }
    const {name,email,city,postalCode,products,streetAddress,country} = req.body;
    await mongooseConnect();
    const productsIds = products.split(',');
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});

    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {name:productInfo.title},
                    unit_amount: quantity * productInfo.price,
                },
            });
        }
    }
    
    res.json({line_items});
}

