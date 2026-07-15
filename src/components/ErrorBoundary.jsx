import { Component } from 'react';

// Catches render-time errors from a subtree and shows a fallback instead of
// letting the error bubble to the root and unmount the whole app. Used to
// contain failures in the decorative 3D hero (e.g. WebGL unavailable).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
