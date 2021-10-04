#!/usr/bin/node
require("dotenv").config();
var mongoose = require("mongoose");
const faker = require("faker");

require("../models/User");
require("../models/Item");
require("../models/Comment");

mongoose.connect(process.env.MONGODB_URI);
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");

const SEED = 12345678;
faker.seed(SEED);

const NUM_ITEMS = 10;

const tags = [];
for (let i = 0; i < NUM_ITEMS; i++) {
    tags.push(`tag${i}`);
}

async function seeds() {
    // create users
    const users = [];
    for (let i = 0; i < NUM_ITEMS; i++) {
        const user = new User({
            username: `user${i}`,
            email: faker.internet.email(`user${i}`),
            bio: faker.lorem.words(),
            image: faker.image.avatar(),
            user: i === 0 ? "admin" : "user",
            hash: faker.internet.password(),
            salt: faker.internet.password(),
        })
        await user.save();
        users.push(user);
    }

    // create items
    const items = [];
    for (let i = 0; i < NUM_ITEMS; i++) {
        const tagList = [];
        for (let j = 0; j < faker.datatype.number(NUM_ITEMS); j++) {
            tagList.push(tags[j]);
        }
        const item = new Item({
            slug: faker.lorem.slug(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            image: faker.image.abstract() + `?${faker.lorem.slug()}`,
            favoritesCount: faker.datatype.number(),
            tagList: tagList,
            seller: users[faker.datatype.number(NUM_ITEMS-1)]
        });
        await item.save();
        items.push(item);

        const comments = [];
        for (let j = 0; j < NUM_ITEMS; j++) {
            const comment = await new Comment({
                body: faker.lorem.words(),
                seller: users[faker.datatype.number(NUM_ITEMS-1)],
                item: item
            });
            await comment.save();
            comments.push(comment);
        }
        item.comments = comments;
        item.save();
    }

    // populate user's connections
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const favorites = [];
        for (let j = 0; j < faker.datatype.number(NUM_ITEMS); j++) {
            favorites.push(items[j]);
        }
        const following = [];
        for (let j = 0; j < faker.datatype.number(NUM_ITEMS); j++) {
            if (j !== i) {
                following.push(users[j]);
            }
        }
        user.favorites = favorites;
        user.following = following;
        await user.save();
    }
}

if (require.main === module) {
    return seeds()
        .then(() => {
            console.log("done");
            process.exit();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}