import { Component } from "react";

// Показывает текст ошибки вместо белой страницы
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: 24, fontFamily: "monospace" }}>
        <h2>Ошибка на странице</h2>
        <pre style={{ whiteSpace: "pre-wrap", color: "#b00020" }}>{String(this.state.error.stack || this.state.error)}</pre>
        <a href="/">На главную</a>
      </div>
    );
  }
}
