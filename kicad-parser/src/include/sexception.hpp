// /******************************************************************************
//  * Project: KiCAD S-Expression Parser
//  * File:    sexception.hpp
//  * Author:  Check Authors.txt for authors
//  * Date:    17th January 2025
//  *
//  * Description:
//  *
//  * License:
//  * This software is proprietary and cannot be shared, reused, or distributed
//  * without explicit permission from the author(s).
//  *
//  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
//  * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES, OR
//  * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE,
//  * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
//  * OTHER DEALINGS IN THE SOFTWARE.
//  *
//  ******************************************************************************/
// #ifndef SEXPR_EXCEPTION_H_
// #define SEXPR_EXCEPTION_H_

// #include <string>
// #include <exception>
// #include <glog/logging.h>

// namespace sexpr {

// 	class InvalidTypeException : public std::exception {
// 		public:
// 			explicit InvalidTypeException(const std::string& message)
// 				: message_(message) {
// 					LOG(ERROR) << "InvalidTypeException: " << message_;
// 				}

// 			const char* what() const noexcept override {
// 				return message_.c_str();
// 			}

// 		private:
// 			std::string message_;
// 	};

// 	class FileTypeInvalidException : public std::exception {
// 		public:
// 			explicit FileTypeInvalidException(const std::string& message)
// 				: message_(message) {
// 					LOG(ERROR) << "FileTypeInvalidException: " << message_;
// 				}

// 			const char* what() const noexcept override {
// 				return message_.c_str();
// 			}

// 		private:
// 			std::string message_;
// 	};

// 	class ParserException : public std::exception {
// 		public:
// 			explicit ParserException(const std::string& message)
// 				: message_(message) {
// 					LOG(ERROR) << "ParserException: " << message_;
// 				}

// 			const char* what() const noexcept override {
// 				return message_.c_str();
// 			}

// 		private:
// 			std::string message_;
// 	};

// }  // namespace sexpr

// #endif  // SEXPR_EXCEPTION_H_
