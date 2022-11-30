// eslint-disable-next-line @next/next/no-document-import-in-page
import { NextScript } from "next/document";

/**
 * !EXPERIMENTAL DEFER NEXT SCRIPTS
 */
// eslint-disable-next-line max-len
// @see https://bravetheheat.medium.com/supercharge-your-next-js-fcp-and-lcp-for-seo-and-ux-5188b236cb62#:~:text=The%20Metrics%3A%20FCP%20and%20LCP,is%20considered%20%E2%80%9CNeeds%20Improvement%E2%80%9D.


function dedupe<T extends { file: string }>(bundles: T[]): T[] {
  const files = new Set<string>();
  const kept: T[] = [];

  for (const bundle of bundles) {
    if (files.has(bundle.file)) continue;
    files.add(bundle.file);
    kept.push(bundle);
  }
  return kept;
}

type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

/**
 * Custom NextScript to defer loading of unnecessary JS.
 * Standard behavior is async. Compatible with Next.js 10.0.3
 */
class DeferNextScript extends NextScript {
  getDynamicChunks(files: DocumentFiles) {
    const {
      dynamicImports,
      assetPrefix,
      isDevelopment,
      devOnlyCacheBusterQueryString,
    } = this.context;

    return dedupe(dynamicImports.map(e => ({ file: e }))).map((bundle) => {
      if (!bundle.file.endsWith(".js") || files.allFiles.includes(bundle.file))
        return null;

      return (
        <script
          defer={!isDevelopment}
          key={bundle.file}
          src={`${assetPrefix}/_next/${encodeURI(
            bundle.file
          )}${devOnlyCacheBusterQueryString}`}
          nonce={this.props.nonce}
          crossOrigin={
            this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
          }
        />
      );
    });
  }
  getScripts(files: DocumentFiles) {
    const {
      assetPrefix,
      buildManifest,
      isDevelopment,
      devOnlyCacheBusterQueryString,
    } = this.context;

    const normalScripts = files.allFiles.filter((file) => file.endsWith(".js"));
    const lowPriorityScripts = buildManifest.lowPriorityFiles?.filter((file) =>
      file.endsWith(".js")
    );

    return [...normalScripts, ...lowPriorityScripts].map((file) => (
      <script
        key={file}
        src={`${assetPrefix}/_next/${encodeURI(
          file
        )}${devOnlyCacheBusterQueryString}`}
        nonce={this.props.nonce}
        defer={!isDevelopment}
        crossOrigin={
          this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
        }
      />
    ));
  }
}

export default DeferNextScript;
