import { LitElement, html} from '@polymer/lit-element';

class WCHeader extends LitElement {
  static get properties() {
    return {
      duration: Number,
      name: String,
      isOpen: {
        type: Boolean,
        reflect: true
      },
     }
  }

  render() {
    return html`
      <style>

      </style>

      <header>
        <ul>
          <li>Hello there</li>
        </ul>
      </header>
    `;
  }
}
window.customElements.define('wc-header', WCHeader);
