Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`NFTUnboxed | Object: ${request.object}`)

    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")

        // In case of listing update, search for already listed ActiveItem and delete
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("seller", request.object.get("owner"))
        logger.info(`NFTUnboxed | Query: ${query}`)
        const alreadyListedItem = await query.first()
        console.log(`alreadyListedItem ${JSON.stringify(alreadyListedItem)}`)

        if (alreadyListedItem) {
            logger.info(`Deleting ${alreadyListedItem.id}`)
            await alreadyListedItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get(
                    "address"
                )} since the listing is being updated. `
            )
        }

        const activeItem = new ActiveItem()
        activeItem.set("marketplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokenId"))
        activeItem.set("seller", request.object.get("owner"))
        logger.info(
            `Adding Address: ${request.object.get("address")} TokenId: ${request.object.get(
                "tokenId"
            )}`
        )
        logger.info("Saving...")
        await activeItem.save()
    }
})

Moralis.Cloud.afterSave("ItemCanceled", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`NFTUnboxed | Object: ${request.object}`)

    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")

        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`NFTUnboxed | Query: ${query}`)
        const canceledItem = await query.first()
        logger.info(`NFTUnboxed | CanceledItem: ${JSON.stringify(canceledItem)}`)

        if (canceledItem) {
            logger.info(`Deleting ${canceledItem.id}`)
            await canceledItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it was canceled. `
            )
        } else {
            logger.info(
                `No item canceled with address: ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")} found.`
            )
        }
    }
})

Moralis.Cloud.afterSave("ItemSold", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`NFTUnboxed | Object: ${request.object}`)

    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")

        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`NFTUnboxed | Query: ${query}`)
        const soldItem = await query.first()
        logger.info(`NFTUnboxed | SoldItem: ${JSON.stringify(soldItem)}`)

        if (soldItem) {
            logger.info(`Deleting soldItem ${soldItem.id}`)
            await soldItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get(
                    "address"
                )} from ActiveItem table since it was sold.`
            )
        } else {
            logger.info(
                `No item sold with address: ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")} found`
            )
        }
    }
})
