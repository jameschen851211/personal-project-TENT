import algoliasearch from "algoliasearch";

const client = algoliasearch("BR46EFP9JN", "2bdef778086beb1c8aa5723ea2587484");

const algolia = client.initIndex("socialcool");

export default algolia;
