# Semantic Versioning (SemVer) Guidelines

This project follows [Semantic Versioning 2.0.0](https://semver.org/).

Version format:  

---

## 1. Version Components

- **MAJOR** version (X.0.0)  
  - Incremented for incompatible API changes or breaking changes.  
  - Examples: removed/renamed endpoints, changed database schema in a non-backward-compatible way, breaking UI contract.  

- **MINOR** version (0.X.0)  
  - Incremented when functionality is added in a backward-compatible manner.  
  - Examples: new API routes, new features, optional configuration, UI enhancements.  

- **PATCH** version (0.0.X)  
  - Incremented for backward-compatible bug fixes and internal improvements.  
  - Examples: fixing a crash, security patches, typo corrections, small performance tweaks.  

---

## 2. Pre-release Versions

- Before the project reaches **1.0.0**, the API and features may change rapidly.  
- Pre-release versions use identifiers:  
1.2.0-alpha.1
1.2.0-beta.3
1.2.0-rc.1

  - **alpha** → Experimental, unstable builds.  
  - **beta** → Feature-complete, but may contain bugs.  
  - **rc** (Release Candidate) → Candidate for release unless major issues arise.  

---

## 3. Build Metadata

Optional build metadata may be appended after a `+`:  
1.0.0+build.45
1.2.0-beta+exp.sha.5114f85

This does not affect version precedence.  

---

## 4. Versioning Rules for This Project

- All **breaking changes** must bump the **MAJOR** version.  
- New features that don’t break existing APIs bump the **MINOR** version.  
- Bug fixes and security patches bump the **PATCH** version.  
- Pre-releases (`alpha`, `beta`, `rc`) will be used before stable versions.  

---

## 5. Examples

- `1.4.2` → Stable release with bug fixes.  
- `2.0.0` → Introduces breaking changes (e.g., API redesign).  
- `1.5.0-beta.2` → Second beta for upcoming 1.5.0 release.  

---

## 6. References

- [Semantic Versioning 2.0.0](https://semver.org/)  
- [Keep a Changelog](https://keepachangelog.com/) (recommended for documenting changes alongside versions)  
