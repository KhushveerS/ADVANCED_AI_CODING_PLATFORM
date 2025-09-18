import 'dotenv/config';
import mongoose from 'mongoose';
import { SheetModel } from '../models/Sheet';
import { ProblemModel } from '../models/Problem';
import { sheets } from '../data/sheets';
import { fallbackDSAProblems, fallbackCPProblems } from '../data/fallbackProblems';

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  await mongoose.connect(uri);

  for (const key of Object.keys(sheets)) {
    const { meta, problems } = sheets[key];
    await SheetModel.updateOne({ key: meta.key }, { $set: meta }, { upsert: true });
    for (const p of problems) {
      await ProblemModel.updateOne(
        { source: p.source, externalId: p.id },
        {
          $set: {
            externalId: p.id,
            title: p.title,
            difficulty: p.difficulty,
            topic: p.topic,
            tags: [],
            url: p.url,
            source: p.source,
            sheetKey: key,
          },
        },
        { upsert: true }
      );
    }
  }

  for (const p of fallbackDSAProblems) {
    await ProblemModel.updateOne(
      { source: 'leetcode', externalId: String(p.id) },
      {
        $set: {
          externalId: String(p.id),
          title: p.title,
          difficulty: p.difficulty,
          topic: p.topic,
          tags: p.tags || [],
          url: p.url,
          source: 'leetcode',
          acceptanceRate: p.acceptanceRate,
        },
      },
      { upsert: true }
    );
  }

  for (const p of fallbackCPProblems) {
    await ProblemModel.updateOne(
      { source: 'codeforces', externalId: String(p.id) },
      {
        $set: {
          externalId: String(p.id),
          title: p.title,
          difficulty: p.difficulty,
          topic: p.topic,
          tags: p.tags || [],
          url: p.url,
          source: 'codeforces',
          rating: p.rating,
        },
      },
      { upsert: true }
    );
  }

  await mongoose.disconnect();
  console.log('Seed complete');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


