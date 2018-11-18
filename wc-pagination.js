import { LitElement, html} from '@polymer/lit-element';
import {anchors} from './styles.js';

class WCPagination extends LitElement {
  static get properties() {
    return {
      currentPage: Number,
      pages: Number,
      nextPage: Number,
      prevPage: Number,
      story: String,
     }
  }

  render() {
    let {currentPage, pages, nextPage, prevPage, story} = this;

    return html`
      <style>
        .pagination {
          text-align: center;
          display: block;
        }
      </style>

      <div class="pagination">
        ${currentPage !== 1 && html`<a href="/${story}/${nextPage}">&lt; prev</a>`}
        <span>${currentPage}/${pages}</span>
        ${currentPage !== pages && html`<a href="/${story}/${prevPage}">next &gt;</a>`}
      </div>
    `;
  }
}
window.customElements.define('wc-pagination', WCPagination);
